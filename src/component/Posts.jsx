import React from 'react'
import styled from 'styled-components'
import { Input } from '@material-ui/core'

const Main = styled.div`
	display: flex;
	flex-direction: column;
`

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-top: 2rem;
`
const Post = styled.div`
	width: 360px;
	min-height: 230px;
	margin-top: 1.5rem;
	background-color: #e9e9e9;
	padding: 10px;
	border-radius: 5px;
	align-items: stretch;
	position: relative;
`
const PostsUsername = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	font-weight: bold;
	position: absolute;
	bottom: 25px;
`

export default function Posts({ result }) {
	const [ value, setvalue ] = React.useState('')

	function handlerChangeInput(e) {
		setvalue(e.target.value)
	}

	function filtersPosts(arr, value) {
		if (value === '') {
			return arr
		} else {
			const resultFilters = arr.filter(el => {
				const filterByUsername = el.username.toLowerCase().includes(value.toLowerCase())
				const filterByName = el.name.toLowerCase().includes(value.toLowerCase())
				const filterByBody = el.body.toLowerCase().includes(value.toLowerCase())
				const filterByTitle = el.title.toLowerCase().includes(value.toLowerCase())
				if (filterByUsername || filterByName || filterByBody || filterByTitle) {
					return el
				}
			})
			return resultFilters
		}
	}

	const renderPosts = filtersPosts(result, value)

	return (
		<Main>
			<Input
				value={value}
				onChange={handlerChangeInput}
				placeholder="Search"
				inputProps={{ 'aria-label': 'description' }}
				style={{ width: '400px', margin: '0 auto' }}
			/>
			<Container>
				{renderPosts[0] ? (
					renderPosts.map((el) => (
						<Post key={`${el.body}_${el.name}`}>
							<div>
								<h3>{el.title}</h3>
								<div>{el.body}</div>
							</div>
							<PostsUsername>
								<span>Name: {el.name}</span>
								<span>UserName: {el.username}</span>
							</PostsUsername>
						</Post>
					))
				) : (
					<div>Ничего не найдено :(</div>
				)}
			</Container>
		</Main>
	)
}
