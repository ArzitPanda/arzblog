import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'; 



const config = {
    
    dataset:'production',
    projectId:"tx036wha",
    useCdn:true,
    token:"sk7YuRRbBDpc89eoUo7hw0oXlrzqzYmTG3piCjauKX1f0Euw0WPOlQY7zy9tbwinMLWzTyyCYf1dn6LoROoUq4KF0I3I7X0Z4GQDLbdAv1i28IdOjpoIUKaFsdxZO64suCoJ0vlow5TEBF98yWGNVSaM5rASPVgX7nKmZ218UMZRXPIneRnU"
        }


const client= sanityClient(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

        const {name,email,comment,_id}=req.body;

    try {
        
        await client.create({
                _type:'comment',
                post:{
                    _type:'reference',
                    _ref:_id
                },
                name,
                email,
                comment



        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`couldn't submit comment`})
    }



    const data= JSON.stringify(req.body);


  res.status(200).json({message:"sucessfully sent"});
}
