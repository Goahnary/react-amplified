import React from 'react'
import Post from './Post'

export default function PostList({ posts }) {
	return (
		posts.map(post => {
			return <Post key={post.number} post={post} />
		})
	)

}
