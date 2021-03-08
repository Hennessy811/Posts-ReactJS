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
const usersArr = []
const postsArr = [] // если создавать через state, то будут лишние рендеры; это косяк или выносить можно?

function App() {
	const [ render, setRender ] = React.useState(false)

	React.useEffect(() => {
		const posts = new Promise((resolve, reject) => { // Как здесь правильно? как правильно сделать два запроса?
			resolve(fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()))
		})
		const users = new Promise((resolve, reject) => {
			resolve(fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()))
		})
		Promise.all([ posts, users ]).then((data) => {
			usersArr.push(...data[1])
			postsArr.push(...data[0])
			setRender(true)
		})
	}, [])
	const result = postsArr.map((el) => { // Новый массив, который состоит из posts + name и username из массива users
		return {
			...el,
			name: usersArr[el.userId - 1].name,
			username: usersArr[el.userId - 1].username
		}
	})

	return (
		<Container>
			<Wrapper>{result[0] ? <Posts result={result} /> : <div>Loading...</div>} </Wrapper>
		</Container>
	)
}

export default App
