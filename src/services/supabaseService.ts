import { supabase } from '../supabaseClient';
import { CraftItem, Review, User, Message } from '../types';
import { INITIAL_CRAFTS, INITIAL_REVIEWS } from '../data/mockData';

/**
 * Validates whether a string is a standard UUID.
 * Returns the UUID string if valid, or null if invalid / mock string (e.g. "user-current").
 */
export function toValidUuidOrNull(id?: string | null): string | null {
  if (!id) return null;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  return isUuid ? id : null;
}

// ============================================================================
// CRAFTS CRUD SERVICES
// ============================================================================

/**
 * 1) Load all crafts from Supabase (or fallback to initial items if offline/empty)
 */
export async function getCrafts(): Promise<CraftItem[]> {
  try {
    const { data, error } = await supabase
      .from('crafts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error, using local fallback:', error.message);
      return INITIAL_CRAFTS;
    }

    if (!data || data.length === 0) {
      return INITIAL_CRAFTS;
    }

    // Map database snake_case columns to CraftItem camelCase
    return data.map((row: any) => ({
      id: row.id,
      craftsmanId: row.user_id || row.craftsman_id || 'artisan',
      craftsmanName: row.craftsman_name || 'Master Artisan',
      craftsmanAvatar: row.craftsman_avatar || '',
      title: row.title,
      category: row.category || 'Woodwork',
      tags: Array.isArray(row.tags) ? row.tags : (row.tags ? row.tags.split(',') : ['#Handmade']),
      description: row.description || '',
      imageUrl: row.image_url || '',
      galleryImages: row.gallery_images || [row.image_url],
      location: row.location || 'Morocco',
      rating: Number(row.rating) || 5.0,
      reviewCount: Number(row.review_count) || 1,
      experienceYears: row.experience_years || '10+ years experience',
      specialtySubtitle: row.specialty_subtitle || '',
      specs: {
        materials: row.materials,
        dimensions: row.dimensions,
        craftingTime: row.crafting_time,
        origin: row.origin || row.location
      }
    }));
  } catch (err) {
    console.warn('Notice in getCrafts:', err);
    return INITIAL_CRAFTS;
  }
}

/**
 * 2) Create a new craft item in Supabase
 */
export async function createCraft(craft: Omit<CraftItem, 'id'>, userId?: string): Promise<CraftItem | null> {
  try {
    const validUserId = toValidUuidOrNull(userId);
    const payload = {
      user_id: validUserId,
      title: craft.title,
      category: craft.category,
      tags: craft.tags,
      description: craft.description,
      image_url: craft.imageUrl,
      gallery_images: craft.galleryImages,
      location: craft.location,
      craftsman_name: craft.craftsmanName,
      craftsman_avatar: craft.craftsmanAvatar,
      specialty_subtitle: craft.specialtySubtitle,
      materials: craft.specs?.materials,
      dimensions: craft.specs?.dimensions,
      crafting_time: craft.specs?.craftingTime,
      origin: craft.specs?.origin,
      rating: 5.0,
      review_count: 1
    };

    const { data, error } = await supabase
      .from('crafts')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.warn('Notice creating craft in Supabase (fallback to local state):', error.message);
      // Return optimistic local craft if Supabase table is not yet migrated or RLS restricted
      return {
        id: `craft-${Date.now()}`,
        ...craft
      };
    }

    return {
      id: data.id,
      ...craft
    };
  } catch (err) {
    console.warn('Exception in createCraft:', err);
    return {
      id: `craft-${Date.now()}`,
      ...craft
    };
  }
}

/**
 * 3) Update an existing craft item in Supabase
 */
export async function updateCraft(
  craftId: string,
  updates: Partial<CraftItem>,
  userId?: string
): Promise<boolean> {
  try {
    const payload: any = {
      updated_at: new Date().toISOString()
    };
    if (updates.title) payload.title = updates.title;
    if (updates.category) payload.category = updates.category;
    if (updates.tags) payload.tags = updates.tags;
    if (updates.description) payload.description = updates.description;
    if (updates.imageUrl) payload.image_url = updates.imageUrl;
    if (updates.location) payload.location = updates.location;
    if (updates.specs?.materials) payload.materials = updates.specs.materials;
    if (updates.specs?.dimensions) payload.dimensions = updates.specs.dimensions;

    let query = supabase.from('crafts').update(payload).eq('id', craftId);
    const validUserId = toValidUuidOrNull(userId);
    if (validUserId) {
      query = query.eq('user_id', validUserId);
    }

    const { error } = await query;
    if (error) {
      console.warn('Notice updating craft in Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Exception in updateCraft:', err);
    return false;
  }
}

/**
 * 4) Delete a craft item from Supabase
 */
export async function deleteCraft(craftId: string, userId?: string): Promise<boolean> {
  try {
    let query = supabase.from('crafts').delete().eq('id', craftId);
    const validUserId = toValidUuidOrNull(userId);
    if (validUserId) {
      query = query.eq('user_id', validUserId);
    }

    const { error } = await query;
    if (error) {
      console.warn('Notice deleting craft from Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Exception in deleteCraft:', err);
    return false;
  }
}

// ============================================================================
// REVIEWS SERVICES
// ============================================================================

export async function getReviews(craftsmanId: string): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('craftsman_id', craftsmanId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_REVIEWS;
    }

    return data.map((r: any) => ({
      id: r.id,
      craftsmanId: r.craftsman_id,
      author: r.author || 'Customer',
      rating: Number(r.rating) || 5,
      text: r.text,
      date: new Date(r.created_at).toLocaleDateString()
    }));
  } catch {
    return INITIAL_REVIEWS;
  }
}

export async function addReview(
  craftsmanId: string,
  author: string,
  rating: number,
  text: string,
  userId?: string
): Promise<Review | null> {
  try {
    const validUserId = toValidUuidOrNull(userId);
    const payload = {
      craftsman_id: craftsmanId,
      author,
      rating,
      text,
      user_id: validUserId
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.warn('Review Supabase insert fallback:', error.message);
      return {
        id: `rev-${Date.now()}`,
        craftsmanId,
        author,
        rating,
        text,
        date: 'Just now'
      };
    }

    return {
      id: data.id,
      craftsmanId: data.craftsman_id,
      author: data.author,
      rating: data.rating,
      text: data.text,
      date: 'Just now'
    };
  } catch {
    return {
      id: `rev-${Date.now()}`,
      craftsmanId,
      author,
      rating,
      text,
      date: 'Just now'
    };
  }
}
