import CardList from '../components/CardList';
import Hero from '../components/Hero'
import Panel from '../components/Panel'
import Newsletter from '../components/Newsletter';

function PageHome() {
  return (
    <>
      <Hero />
      <Panel />
		<CardList />
    <Newsletter/>
    </>
  )
}
export default PageHome
