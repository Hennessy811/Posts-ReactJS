import React from 'react'
import Posts from './component/Posts'
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
	padding-top: 2rem;
`

function App() {
	const [ users, setUsers ] = React.useState([])
	const [ posts, setPost ] = React.useState([])

	React.useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((res) => res.json())
			.then((res) => setPost(res))
			.then(fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json())
			.then((res) => setUsers(res)))
	}, [])

	const result = posts.map((el) => { // Новый массив, который состоит из posts и  name и username из массива users
		return {
			...el,
			name: users[el.userId - 1].name,
			username: users[el.userId - 1].username
		}
	})
	return (
		<Container>
			<Wrapper>{result[0] && <Posts result={result}/>}</Wrapper>
		</Container>
	)
}

export default App
