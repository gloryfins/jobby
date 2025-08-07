import { createClient } from '@/lib/supabase/server'

// Example database operations
export async function getProfiles() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
  
  if (error) {
    console.error('Error fetching profiles:', error)
    return []
  }
  
  return data
}

export async function createProfile(profile: { 
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
  
  if (error) {
    console.error('Error creating profile:', error)
    return null
  }
  
  return data[0]
}

export async function updateProfile(id: string, updates: {
  full_name?: string
  avatar_url?: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating profile:', error)
    return null
  }
  
  return data[0]
}

// Example function to get user-specific data
export async function getUserData(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user data:', error)
    return null
  }
  
  return data
}

// Job Posts Functions
export type JobPost = {
  id?: string
  user_id?: string
  title: string
  company_name: string
  description: string
  location: string
  job_type: 'full-time' | 'part-time' | 'contract'
  salary_range?: string
  requirements?: string[]
  benefits?: string[]
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export async function createJobPost(jobPost: Omit<JobPost, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('job_posts')
    .insert([{
      ...jobPost,
      user_id: user.id
    }])
    .select()
  
  if (error) {
    console.error('Error creating job post:', error)
    throw error
  }
  
  return data[0]
}

export async function getUserJobPosts(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('job_posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching user job posts:', error)
    return []
  }
  
  return data
}

export async function getAllActiveJobPosts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('job_posts')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching job posts:', error)
    return []
  }
  
  return data
}

export async function updateJobPost(id: string, updates: Partial<JobPost>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('job_posts')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating job post:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteJobPost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('job_posts')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting job post:', error)
    throw error
  }
  
  return true
}
