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
    replies?: []
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

interface GoogleUser {
    email?: string | null | undefined
    image?: string | null | undefined
    name?: string | null | undefined
}
  
interface CurrentUser {
    currentUserId: string;
    currentUserImg: string;
    currentUserProfile: string;
    currentUserFullName: string;
}
  

interface MaterialPreview {
    link: string;
    title: string;
    description: string;
    dateRef?: string;
    image?: { src: string, alt: string };
    enable: boolean;
    category: MaterialCategory;
    downloadUrl?: string;
    formComponent?: React.ElementType;
}

type MaterialCategory = 'download' | 'form'

interface MenuItem {
    name: string;
    href: string;
    openInNewTab?: boolean;
    dropdown?: boolean;
  }
  
  type MenuCategoryItem = MenuItem & { meta: { title: string, description: string }, slug: string }