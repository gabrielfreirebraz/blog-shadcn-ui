interface GetPostResultWithMetadata extends GetPostResult {
    post: GetPostResult['post'] & {
        metadata?: Record<string, string | null>; 
    };
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
}

type MaterialCategory = 'download' | 'form'
