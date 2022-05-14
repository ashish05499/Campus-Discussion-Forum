import Post from "../model/post-schema.js";


export const CreatePost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();
        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getAllPosts = async (request, response) => {
    let Category = request.query.Category;
    let posts;
    try {
        if (Category) {
            posts = await Post.find({ category: Category });
            response.status(200).json(posts);
        }
        else {
            posts = await Post.find({});
            response.status(200).json(posts);
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getPost = async (request, response) => {
    try {
        let post = await Post.findById(request.params.id);
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const updatePost = async (request, response) => {
    try {
        await Post.findByIdAndUpdate(request.params.id, { $set: request.body });
        response.status(200).json('Post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const deletePost = async (request, response) => {
    try {
        let post = await Post.findById(request.params.id);
        await post.delete();
        response.status(200).json('Post deleted successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}