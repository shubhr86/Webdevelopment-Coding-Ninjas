
export default class PostModel{
    constructor(id,userId,caption, imageUrl){
        this.id= id;
        this.userId=userId;
        this.caption=caption;
        this.imageUrl=imageUrl;
        this.comments=[];
        this.likes=[];
        this.bookmarkedBy = [];
    }

    static createPost(post){
        post.comments = [];
        post.likes = [];
        post.bookmarkedBy = [];
        post.id= posts.length+1;
        posts.push(post);
        return post;
    }
    static getAllPosts(){
        return posts;
    }
    static getPostsbyId(id){
        const post= posts.find((p)=>
        p.id==id);
        return post;
    }
    static getPostsByUser(userId) {
        return posts.filter((post) => post.userId === userId);
    }
    
    static updatePost(id,caption,imageUrl){
        const post= posts.find((p)=> p.id==id);
        if (post){
            post.caption=caption;
            post.imageUrl=imageUrl;
            return post;
        }else{
            console.log(err);
        }
    }

    static deletePost(id) {
        const index = posts.findIndex((p) => p.id == id);
        //console.log(id,index);

        if (index !== -1) {
            const postDelete= posts.splice(index, 1);
            return postDelete;
        }
    }
    
    // static likePost(id,userId){
    //     const post= getPostsbyId(id);
    //     if (post && !post.likes.includes(userId)){
    //         post.likes.push(userId);
    //         return true;
    //     }
    //     return false;
    // }
    // static postUnlike(id,userId){
    //     const post= getPostsbyId(id);
    //     if (post){
    //         const index= post.likes.indexOf(userId);
    //         if (index !== -1){
    //             post.likes.splice(index, 1);
    //             return true;
    //         }
    //     }
    //     return false;

    // }


    // static commentoOnPost(postId, userId, content) {
    //       const post= posts.find((p)=>
    //          p.id==id);
    //     if (post) {
    //         const comment = CommentModel.createComment(userId, content, postId);
    //         post.comments.push(comment);
    //         return comment;
    //     }
    //     return null;
    // }
    
    static getPostsByCaption(caption) {
        return posts.filter((post) => post.caption.toLowerCase().includes(caption.toLowerCase()));
    }

    static saveAsDraft(post) {
        post.isDraft = true;
        posts.push(post);
        return post;
    }
    
    static archivePost(id) {
        const post = PostModel.getPostsbyId(id);
        if (post) {
            post.isArchived = true;
            return true;
        }
        return false;
    }
    static sortPostsByEngagement() {
        try {
            const sortedPosts = [...posts];
            sortedPosts.forEach(post => {
                if (!post.likes) post.likes = [];
                if (!post.comments) post.comments = [];
            });

            return sortedPosts.sort((a, b) => {
                const engagementDiff = b.likes.length + b.comments.length - (a.likes.length + a.comments.length);
                if (engagementDiff !== 0) {
                    return engagementDiff;
                }

                // If engagement is the same, sort by date (newest first)
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        } catch (error) {
            console.error("Error sorting posts:", error);
            throw error; 
        }
    }
    

    // bookMark

    static bookmarkPost(userId, id) {
        const post = PostModel.getPostsbyId(id);

        if (post) {
            post.bookmarkedBy.push(userId);
            return true;
        }
        return false;
    }

    static getPaginatedPosts(page, pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return posts.slice(startIndex, endIndex);
}

    
    

}

const posts=[
    new PostModel(1,1,"First post", "https://example.com/first-image.jpg",),
];
