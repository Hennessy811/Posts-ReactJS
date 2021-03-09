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

function mergeData(posts, users) {
	const result = posts.map((el) => {
		return {
			...el,
			name: users[el.userId - 1].name,
			username: users[el.userId - 1].username
		}
	})
	return result
}

function App() {
	const [ data, setData ] = React.useState([]) // здесь будут храниться оба массива
	const result = [] // Новый массив, который будет состоять состоит из posts + name и username из массива users
	React.useEffect(() => {
		const posts = new Promise((resolve, reject) => {
			// Как здесь правильно? как правильно сделать два запроса?
			resolve(fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()))
		})
		const users = new Promise((resolve, reject) => {
			resolve(fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()))
		})
		Promise.all([ posts, users ]).then((data) => {
			setData(data)
		})
	}, [])

	if (data[0]) {
		result.push(...mergeData(data[0], data[1]))
	}
	return <Container>{<Wrapper>{result[0] ? <Posts result={result} /> : <div>Loading...</div>} </Wrapper>}</Container>
}

export default App
