import { BlogList } from '../BlogList'
import { TogglableBlogForm } from '../TogglableBlogForm'

export const Home = ({ blogs, user }) => {
  return (
    <>
      <TogglableBlogForm />
      <BlogList blogs={blogs} user={user}/>
    </>
  )
}