import { useSelector } from 'react-redux'
import { getPostsState } from '../../slices/postsSlice'
import PostItem from './PostItem'

const PostsList = () => {
    const { posts } = useSelector(getPostsState)
    
  return <div>{posts.map((post) => <PostItem key={post.id} post={post} />)}</div>
}

export default PostsList