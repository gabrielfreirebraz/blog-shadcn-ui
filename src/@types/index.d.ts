interface GetPostResultWithMetadata extends GetPostResult {
    post: GetPostResult['post'] & {
        metadata?: Record<string, string | null>; 
    };
}

interface CommentDataLibrary {
    userId: string
    comId: string
    avatarUrl: string
    userProfile?: string
    fullName: string
    text: string
    replies?: CommentDataLibrary[]
    timestamp?: string
    postId?: string //
}

interface CommentDataApi {
    user_id: string
    comment_id: string
    post_id: string
    avatar_url: string
    user_profile?: string
    full_name: string
    text: string
    replies: []
    created_at: string
}