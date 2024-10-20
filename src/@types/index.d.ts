interface GetPostResultWithMetadata extends GetPostResult {
    post: GetPostResult['post'] & {
        metadata?: Record<string, string | null>; 
    };
}