import { useRouter } from 'next/router';
import { addProduct, getSingleProduct } from '@/http';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBackOutline } from 'react-icons/io5'
import AdminLayout from '@/components/Admin/Layout/AdminLayout';
import { getSession } from 'next-auth/react';


export default function ProductDetails() {
  const router = useRouter();
  const urlslug = router?.query?.slug;

  const [data, setData] = useState<any>([])



  const [name, setName] = useState('')
  const handleNameInput = (event: any) => {
    setName(event.target.value);
  };
  const [category, setCategory] = useState('')
  const handleCategoryInput = (event: any) => {
    setCategory(event.target.value);
  };
  const [description, setDescription] = useState('')
  const handleDescriptionInput = (event: any) => {
    setDescription(event.target.value);
  };
  const [price, setPrice] = useState('')
  const handlePriceInput = (event: any) => {
    setPrice(event.target.value);
  };
  const [slug, setSlug] = useState('')
  const handleSlugInput = (event: any) => {
    setSlug(event.target.value);
  };
  const [stock, setStock] = useState('')
  const handleStockInput = (event: any) => {
    setStock(event.target.value);
  };


  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)



  const [images, setImages] = useState([])
  const [imagesPrew, setImagesPrew] = useState([])

  console.log(images, setImages)

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(e.target.files as FileList);
    setImages([]);
    setImagesPrew([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result] as never);
          setImagesPrew((old) => [...old, reader.result] as never);

        }
      }

      reader.readAsDataURL(file);
    })

  }

  async function handleNewProduct() {
    setLoading(true);
    try {
      const res = await addProduct({ name, category, description, images, price, slug });
      if (res.data.success == true) {
        toast.success("Item Added.")
        setTimeout(() => window.location.reload(), 3000);
        setLoading(false);
      }


    } catch (error: any) {
      console.log(error?.response?.data?.error)
      toast.error(error?.response?.data?.error || "Something went wrong.")
      setLoading(false)
    }
  }

  async function getProductData() {
    setLoading(true);
    try {

      const res = await getSingleProduct(urlslug as string);
      setData(res?.data?.product)
      setLoading(false);
    } catch (error: any) {
      console.log(error?.response?.data?.error)
      toast.error(error?.response?.data?.error || "Something went wrong.")
      setLoading(false);
    }
  }

  useEffect(() => {
    if (urlslug) {
      getProductData();
      // setLoading(false)
    }
  }, [])




  return (
    <>
      <AdminLayout>
        <div className='mx-10'>
          <div className='font-bold mx-10 py-8 flex gap-2'>
            <div onClick={() => router.back()} className='my-auto border px-3 cursor-pointer duration-500 hover:bg-yellow-300 hover:text-black py-2 border-red-500 bg-red-500 gap-1 text-white rounded-full text-sm flex'>
              <IoArrowBackOutline className='my-auto h-5 w-5' />
            </div>
            <div className='text-2xl flex gap-10 my-auto'>Edit Product</div>
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <div className=''>
              <div className='font-bold pl-5'>Name</div>
              <input type="text" className='w-[80%] border focus:outline-none rounded-full px-5 py-1' placeholder='Enter the Name' defaultValue={data?.name} onChange={handleNameInput} />
            </div>

            <div>
              <div className='font-bold pl-5'>Catagory</div>
              <input className='w-[80%] border focus:outline-none rounded-full px-5 py-1' placeholder='catagory' onChange={handleCategoryInput} defaultValue={data?.category} />
            </div>

            <div>
              <div className='pl-5 font-bold'>Description</div>
              <input className='w-[80%] border focus:outline-none rounded-full px-5 py-1' placeholder='description' onChange={handleDescriptionInput} defaultValue={data?.description} />
            </div>

            <div>
              <div className='pl-5 font-bold'>Slug</div>
              <input onChange={handleSlugInput} defaultValue={data?.slug} className='w-[80%] border focus:outline-none rounded-full px-5 py-1' placeholder='slug' />
            </div>

            <div>
              <div className='pl-5 font-bold'>Price</div>
              <input type="number" onChange={handlePriceInput} defaultValue={data?.price} className='w-[40%] border focus:outline-none rounded-full px-5 py-1' placeholder='price' />
            </div>

            <div>
              <div className='pl-5 font-bold'>Stock</div>
              <input type="number" onChange={handleStockInput} defaultValue={data?.stock} className='w-[40%] border focus:outline-none rounded-full px-5 py-1' placeholder='stock' />
            </div>

            <div className='pl-5'>
              <div className='text font-bold'>Images</div>
              <input type='file' onChange={onSelectFile} multiple accept='image/png, image/jpeg, image/webp' />
              <div className='flex flex-wrap gap-5 my-5'>

                {
                  imagesPrew.length > 0 ? imagesPrew?.map((image) => (
                    <div className='w-10 h-10 relative'>
                      <Image
                        src={image}
                        objectFit='contain'
                        layout='fill'
                        className='w-fit h-fit'
                        alt='img'
                      />
                    </div>
                  ))
                    :
                    data && data.images && data?.images.map((image: any) => (
                      <div className='w-10 h-10 relative'>
                        <Image
                          src={image?.url}
                          objectFit='contain'
                          layout='fill'
                          className='w-fit h-fit'
                          alt='img'
                        />
                      </div>
                    ))
                }
              </div>
            </div>

          </div>
          <div onClick={handleNewProduct} className={`text-center w-32 mt-4 hover:bg-black duration-500 ${loadingButton ? 'bg-black' : 'bg-red-600'}  py-2 rounded-full text-white cursor-pointer' onClick={() => handleNewProduct()`}>
            {
              loadingButton ?
                <div className="w-6 h-6 rounded-full animate-spin border-4 mx-auto border-solid border-white border-t-transparent"></div>
                :
                <button className=''>
                  Update
                </button>
            }
          </div>
        </div>
      </AdminLayout>

    </>
  );
}


export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { slug } = context.query;
    return {
    props: {}
  }
}
