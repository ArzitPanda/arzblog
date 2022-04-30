import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Comments, Post } from '../../typings'
import PortableText from 'react-portable-text'
import { Button, Input, TextField } from '@mui/material';
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Head from 'next/head'



interface Props {

    blogs:Post,
    comments:[Comments]


}


const Blog = (props:Props) => {
      const[name,setName]=useState("");
      const[email,setEmail]=useState("");
      const[comment,setComment]=useState("");
      const [open, setOpen] = useState(false);
      const data =props.comments;
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    console.log(data);
      const submit= (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            e.preventDefault();
            
           


           
             axios.post('/api/createComment',{

                name:name,
                email:email,
                comment:comment,
                _id:props.blogs._id


             }).then(data=>console.log("sucessfully sent")).catch(error=>console.log(error));
             setOpen(true);
           setComment("");
           setEmail("");
           setName("");

          
      }

  return (
    <main>
     
        <Header/>
        <Head>
        <title>{props.blogs.title}</title>
       
      </Head>
        <img className="w-full h-80 object-cover" src={urlFor(props.blogs.mainImage).url()} alt="" />

            <article className="max-w-3xl h-1/3 mx-auto p-5 border mt-2">

                <h1 className="text-3xl mt-10 mb-1">{props.blogs.title.toUpperCase()}</h1>
                <h2 className="text-xl font-light">{props.blogs.description}</h2>
                <div className='inline-flex items-center gap-x-4 mt-4'>

                        <img className="h-10 w-10 rounded-full" src={urlFor(props.blogs.author.image).url()} alt=""/>
                        <p className="font-extralight text-xs">created by<span className="text-green-600 font-semibold"> {props.blogs.author.name+" "}</span> at {props.blogs._createdAt.slice(0,props.blogs._createdAt.indexOf('T'))} - 
                        
                       
                        
                        {
                          " "+ props.blogs._createdAt.slice(props.blogs._createdAt.indexOf('T')+1,props.blogs._createdAt.indexOf('T')+6) 
                        }</p>


                </div>

                        <div>

                           <PortableText 
                           dataset='production'
                           projectId="tx036wha"
                           content={props.blogs.body}
                           serializers={
                               {
                                   h1:(props:any)=>(
                                       <h1 className="text-2xl font-bold my-5 text-red-"{...props} />
                                   ),
                                   h2:(props:any)=>(
                                    <h2 className="text-xl font-bold my-5"{...props} />
                                ),
                                li:({children}:any)=>(
                                    <li className="ml-4 list-disc">{children}</li>
                                ),
                               link:({href,children}:any)=>(
                                    <a href={href} className="text-blue-500 hover:underline">{children}</a>
                                ),
                               }
                           }
                           />
                        </div>
                        

            </article>
            {/* <hr className="max-w-6xl mb-3 mx-auto mt-6 color-red-600" /> */}
            <div className="flex flex-col items-center px-7 min-h border max-w-3xl mx-auto mt-2 py-10 space-y-7">
              <h2 className='text-3xl text-left max-w-xl mb-5 text-blue-500'>Leave a comment</h2>
              
            <TextField className="w-72 p-0 mt-2" label="name" variant="outlined" color='primary' type="text" value={name} onChange={(e:any)=>{e.preventDefault();
              setName(e.target.value)}} />
            <TextField className="w-72 " label="email" variant="outlined" color='primary' type="email" value={email}  onChange={(e:any)=>{e.preventDefault();setEmail(e.target.value)}} />
            <TextField className="w-72  mb-5 " label="comment" variant="outlined" color='primary' type="text" value={comment}  onChange={(e:any)=>{e.preventDefault();setComment(e.target.value)}} />
                <button className="bg-blue-500 px-3 py-1 rounded-md mt-3" onClick={(e)=>submit(e)}>submit</button>

            </div>

                <div className="flex flex-col  px-7  py-2 border max-w-3xl mx-auto mt-2 mb-10">

                  <h2 className="text-xl py-5">comments</h2>

                  {data.map(val=>{return(<div className='flex flex-row items-center border max-w-xl py-2 px-5  space-x-6'>

                    <div className='border-2 border-blue-600 flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-center'><span className='font-extrabold text-white font-mono'>{val.name.charAt(0).toUpperCase()}</span></div>
                    <div>
                      <p className="font-semibold text-blue-500">{val.name}</p>
                      <p className="font-semibold">{val.comment+" "} at{" "+val._createdAt.substring(0,10)} </p>
                    </div>



                  </div>)})}


                </div>
                <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Your comment sucessfully sent😘
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Your comment will be reviewed and sucessfully display after someInterval
           \n stay tuned
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>cancel</Button>
          
        </DialogActions>
      </Dialog>
    </main>
  )
}

export default Blog






export const getStaticPaths =async ()=> {

        const query=`*[_type=="post"]{
            _id,
            slug{
            current
          }
          }`;

          const blogs =await sanityClient.fetch(query);

          const paths = blogs.map((post:Post)=>({

            params:{
              slug:post.slug.current,
            }
          }))

          return {

            paths,
            fallback:"blocking",


          };

}


export const getStaticProps:GetStaticProps= async ({params})=>{

        const query=`*[_type=="post" && slug.current ==$slug][0]
        {
          
          _id,
          _createdAt,
          title,
          author->{
          
          name,
          image
        },
        description,
        mainImage,
        slug,
        body
          
        }`
        const query1=`*[_type == "comment" && approve == true && post._ref==$id]{
  
          _id,
          email,
          name,
          comment,
          _createdAt
          
          
        }`

        const blogs= await sanityClient.fetch(query,{slug:params?.slug});
       

        if(!blogs){
                return{

                    notFound:true,
                }

        }
        const comments = await sanityClient.fetch(query1,{id:blogs._id});
        console.log(comments);
        return{

            props:{

                blogs,
                comments

            },
            revalidate:60,
        }

}