import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { Post } from '../typings'
import Link from 'next/link'


interface Props {

  post:[Post]


}


const Home = (props:Props) => {
  console.log(props.post);

  return (
    <div className="">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/medium.ico" />
      </Head>
      <Header/>
      <Banner/>
      {/* posts */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 p-2 md:p-8 mx-auto" >
      {props.post.map(val=>{return(

          <Link key={val._id} href={`/post/${val.slug.current}`}>

            <div className="w-96 mx-auto group border rounded-lg overflow-hidden">
              <img className="h-60 w-full object-cover group-hover:scale-105 transistion-transform  duration-200 ease-in-out  " src={urlFor(val.mainImage).url()} alt="" />
            <div className="flex justify-between p-3 ">
              <div>
                <p className="font-semibold ">{val.title.toUpperCase()}</p>
                <p>{val.description+" by "+val.author.name}</p>
               
              </div>
                <img  className="h-12 w-12 rounded-full" src={urlFor(val.author.image).url()} alt=""/>
            </div>
            </div>


          </Link>



      )})}
      </div>

    </div>
  )
}

export default Home



export const getServerSideProps = async ()=>{
      const query= `*[_type=="post"]
      {

          _id,title, mainImage,author->{

              name,image


          },
          description,
          slug


      }`;

      const post = await sanityClient.fetch(query);


        return{ 

          props:{
            post
          }
        }

}