import {createCurrentUserHook,createClient,} from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'


export const config={

    dataset:"production",
    projectId:"tx036wha",
    apiVersion:"2022-04-29",
    useCdn:true,


}

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient)
export const urlFor=(source)=>{

            return builder.image(source);


}

export const useCurrentUser = createCurrentUserHook(config);