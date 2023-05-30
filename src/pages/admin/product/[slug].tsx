import { useRouter } from 'next/router';
import { addProduct, getSingleProduct, updateProduct } from '@/http';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBackOutline } from 'react-icons/io5'
import AdminLayout from '@/components/Admin/Layout/AdminLayout';
import { getSession, useSession } from 'next-auth/react';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';



export default function ProductDetails() {
  const { data: session }: any = useSession()
  setCookies('token', session?.user?.token, { maxAge:  60 * 60 * 24 * 30 });

  const categories = ['shawarma', 'farnkie', 'fries'];

  const router = useRouter();
  const urlslug = router?.query?.slug;

  const [data, setData] = useState<any>([])
  const [productID, setproductID] = useState<string>('')


  const [name, setName] = useState('')
  const handleNameInput = (event: any) => {
    setName(event.target.value);
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

  const foodType = ['veg', 'non-veg'];
    const [type, setType] = useState('')
    const [selectTypeOpen, setselectTypeOpen] = useState(false);
    const [selectedTypeOption, setselectedTypeOption] = useState('');

    const toggleTypeOptions = () => {
        setselectTypeOpen(!selectTypeOpen);
    };

    const selectTypeOption = (type: string) => {
        setselectedTypeOption(type);
        setType(type);
        setselectTypeOpen(false);
    };

  const [stock, setStock] = useState('')
  const handleStockInput = (event: any) => {
    setStock(event.target.value);
  };


  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)



  const [images, setImages] = useState([])
  const [imagesPrew, setImagesPrew] = useState([])


  const [category, setCategory] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (categories: string) => {
    setSelectedOption(categories);
    setCategory(categories);
    setIsOpen(false);
  };

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

  async function handleUpdateProduct() {
    setLoadingButton(true);
    try {
      let data = { name, category, description, stock, price, slug, type }
      if (Array.isArray(images) && images.length > 0) {
        if (typeof images[0] === 'string') {
          // If the first item in the `images` array is a string, assume it holds multiple image URLs
          data = { ...data, images } as any;
        }
        // If the first item in the `images` array is an object, assume it holds additional image data and exclude it from the `data` object
      }
      const res = await updateProduct(productID, data);
      if (res.data.success == true) {
        toast.success("Item Updated.")
        setTimeout(() => window.location.reload(), 3000);
        setLoadingButton(false);
      }


    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.error || "Something went wrong.")
      setLoadingButton(false)
    }
  }

  async function getProductData() {
    setLoading(true);
    try {

      const res = await getSingleProduct(urlslug as string);
      setData(res?.data?.product)
      setproductID(res?.data?.product?._id);
      setName(res?.data?.product?.name);
      setCategory(res?.data?.product?.category);
      setSlug(res?.data?.product?.slug);
      setPrice(res?.data?.product?.price);
      setDescription(res?.data?.product?.description);
      setStock(res?.data?.product?.stock);
      setImages(res?.data?.product?.images);
      setType(res?.data?.product?.type);


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
      setLoading(false)
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
              <input type="text" className='w-[80%] border focus:outline-none rounded-full px-5 py-1' placeholder='Enter the Name' defaultValue={name} onChange={handleNameInput} />
            </div>
            <div className="relative">
              <div className='font-bold pl-5'>Catagory</div>

              <div
                className="w-[80%] border rounded-full py-2 px-4 cursor-pointer"
                onClick={toggleOptions}>
                <span className='capitalize'>
                  {category ? category : selectedOption || 'Select an option'}
                </span>
              </div>
              {isOpen && (
                <div className="absolute w-[80%] bg-yellow-300 border border-gray-300 rounded-xl mt-1">
                  {categories.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 hover:bg-red-500 rounded-xl cursor-pointer"
                      onClick={() => selectOption(option)}
                    >
                      <span className='capitalize'>{option}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>



            <div className="relative">
                    <div className='font-bold pl-5'>Type</div>

                    <div
                        className="w-[80%] border rounded-full py-2 px-4 cursor-pointer"
                        onClick={toggleTypeOptions}>
                        <span className='capitalize'>
                            {type ? type : selectedTypeOption || 'Select an option'}
                        </span>
                    </div>
                    {selectTypeOpen && (
                        <div className="absolute w-[80%] bg-yellow-300 border border-gray-300 rounded-xl mt-1">
                            {foodType.map((option) => (
                                <div
                                    key={option}
                                    className="px-4 py-2 hover:bg-red-500 rounded-xl cursor-pointer"
                                    onClick={() => selectTypeOption(option)}
                                >
                                    <span className='capitalize'>{option}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>



            <div>
              <div className='pl-5 font-bold'>Description</div>
              <input className='w-[80%] border focus:outline-none rounded-full px-5 py-1' placeholder='description' onChange={handleDescriptionInput} defaultValue={description} />
            </div>

            <div>
              <div className='pl-5 font-bold'>Price</div>
              <input type="number" onChange={handlePriceInput} defaultValue={price} className='w-[40%] border focus:outline-none rounded-full px-5 py-1' placeholder='price' />
            </div>

            <div className=''>
              <div className='pl-5 font-bold'>Stock</div>
              <input type="number" onChange={handleStockInput} defaultValue={stock} className='w-[40%] border focus:outline-none rounded-full px-5 py-1' placeholder='stock' />
            </div>

            <div className='pl-5 col-span-2'>
              <div className='text font-bold'>Images</div>
              <input type='file' onChange={onSelectFile} multiple accept='image/png, image/jpeg, image/webp' />
              <div className='flex flex-wrap gap-5 my-5'>

                {
                  imagesPrew.length ? imagesPrew?.map((image) => (
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
                    data.images && data.images.map((image: any) => (
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
          <div onClick={handleUpdateProduct} className={`text-center w-32 mt-4 hover:bg-black duration-500 ${loadingButton ? 'bg-black' : 'bg-red-600'}  py-2 rounded-full text-white cursor-pointer`}>
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
