"use client";
import React from 'react'

// import { CommentSection} from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import dynamic from 'next/dynamic';


const CommentSection = dynamic(() => import('react-comments-section').then(mod => mod.CommentSection), {
    ssr: false,
    loading: () => <p>Carregando comentários...</p>, 
});

export const BlogPostCommentSection = () => {

    const data = [
        {
          userId: '01a',
          comId: '012',
          fullName: 'Riya Negi',
          avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          text: 'Hey, Loved your blog! ',
          timestamp: "2024-09-28T10:34:56Z",
          replies: []
        },
        {
          userId: '02b',
          comId: '017',
          fullName: 'Lily',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          text: 'I have a doubt about the 4th point🤔',
          timestamp: "2024-09-28T10:34:56Z",
          avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
          replies: []
        }
    ]
    
    return <div className='lg:mx-[6%] xl:mx-32 my-20'>
            <CommentSection
                currentUser={{
                currentUserId: '01a',
                currentUserImg:
                    'https://ui-avatars.com/api/name=Riya&background=random',
                currentUserProfile:
                    'https://www.linkedin.com/in/riya-negi-8879631a9/',
                currentUserFullName: 'Riya Negi'
                }}
                advancedInput={true}
                hrStyle={{ border: 'none' }}
                commentData={data}
                logIn={{
                onLogin: () => alert("Call login function"),
                signUpLink: 'http://localhost:3000/'
                }}
                placeHolder={"Write a comment..."}
                customImg='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60'
                formStyle={{ 
                    backgroundColor: 'transparent', 
                    paddingTop: '0px', 
                    paddingBottom: '35px', 
                }}
                inputStyle={{
                    border: '1px solid rgb(208 208 208)',
                    borderRadius: '5px',
                    padding: '10px',
                    marginRight: '10px'
                }}
                submitBtnStyle={{
                border: '1px solid black',
                borderRadius: '5px',
                backgroundColor: 'black',
                padding: '7px 15px 5px'
                }}
                cancelBtnStyle={{
                border: '1px solid #efeded',
                borderRadius: '5px',
                backgroundColor: '#efeded',
                color: '#000',
                padding: '7px 15px 5px'
                }}
                replyInputStyle={{ 
                    borderBottom: '1px solid black', 
                    color: 'black' 
                }}
                onSubmitAction={(data: OnSubmitCommentData) => {
                    console.log('check submit, ', data)
                }}
                currentData={(data: any) => {
                    console.log('current data', data)
                }}
            />
        </div>
}
  