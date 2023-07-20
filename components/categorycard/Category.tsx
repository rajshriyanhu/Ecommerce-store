import { SanityCategory } from '@/config/inventory'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import CategoryCard from './CategoryCard'
import { urlForImage } from '@/sanity/lib/image'
import getCategory from '@/app/actions/getCategory'

const Category = async() => {
    const category = await getCategory()
  return (
    <>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl-grid-cols-8">
        {category.map((item) => {
          return (
            <CategoryCard key={item._id} title={item.name} src={urlForImage(item.images[0]).url()} slug={item.slug} subtitle={item.shortDescription} />
          )
        })}
      </div>
    </>
  )
}

export default Category