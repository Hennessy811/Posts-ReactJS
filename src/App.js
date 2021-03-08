import React from 'react'
import Posts from './components/Posts'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  
`
const Wrapper = styled.div`
	max-width: 1200px;
	display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top:2rem
`

function App() {
	const [ users, setUsers ] = React.useState([]) 
	const [ posts, setPost ] = React.useState([])

	React.useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((res) => res.json())
			.then((res) => setPost(res))
      .then(fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((res) => setUsers(res))) 
	}, [])
	return (
		<Container>
			<Wrapper>
				{users[0] && posts[0] && <Posts users={users} posts={posts} />} 
			</Wrapper>
		</Container>
	)
}

export default App
