import React from 'react'
import deaths from './deaths.png'
import injuries	from './injuries.png'
import damages from './damages.png'
import fires from './fires.png'

export default function Post({ post }){
	return (
		<>
			<div style={{
				
			}}>
					<img src={post.graphImgUrl} width="500px"/>
					<p>{post.content}</p>
					<p>This is the code that produced the graph:</p>
					<pre style={{
						'background-color': '#ffffc3',
						'text-align': 'left',
						'margin': '15px',
						'padding': '5px'
					}}>
{post.code}
					</pre>
			</div>
		</>
	)
}
