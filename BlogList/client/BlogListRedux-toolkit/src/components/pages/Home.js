import { BlogList } from '../BlogList'
import { TogglableBlogForm } from '../ToglableBlogForm'


export const Home = () => {
  return (
    <>
      <h2>Blogs</h2>
      <TogglableBlogForm />
      <BlogList />
    </>
  )
}