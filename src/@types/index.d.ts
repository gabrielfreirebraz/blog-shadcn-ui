interface GetPostResultWithMetadata extends GetPostResult {
    post: GetPostResult['post'] & {
        metadata?: Record<string, string | null>; 
    };
}

interface OnSubmitCommentData {
    userId: string
    comId: string
    avatarUrl: string
    userProfile?: string
    fullName: string
    text: string
    replies: any
    commentId: string
}