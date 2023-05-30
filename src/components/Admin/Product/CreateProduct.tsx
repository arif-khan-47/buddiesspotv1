import { addProduct } from '@/http';
import Image from 'next/image';
import React, { useState } from 'react'
import { ChangeEvent } from 'react';
import toast from 'react-hot-toast'



function CreateProduct() {

    const [name, setName] = useState('')
    const handleNameInput = (event: any) => {
        setName(event.target.value);
        setSlug(generateSlug(event.target.value));
    };

    const categories = ['shawarma', 'farnkie', 'fries'];
    const [category, setCategory] = useState('')
    const [selectCatOpen, setselectCatOpen] = useState(false);
    const [selectedCatOption, setselectedCatOption] = useState('');

    const toggleCatOptions = () => {
        setselectCatOpen(!selectCatOpen);
    };

    const selectCatOption = (categories: string) => {
        setselectedCatOption(categories);
        setCategory(categories);
        setselectCatOpen(false);
    };

    const [description, setDescription] = useState('')
    const handleDescriptionInput = (event: any) => {
        setDescription(event.target.value);
    };
    const [price, setPrice] = useState('')
    const handlePriceInput = (event: any) => {
        setPrice(event.target.value);
    };

    const [stock, setStock] = useState('')
    const handleStockInput = (event: any) => {
        setStock(event.target.value);
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



    const [slug, setSlug] = useState('');


    const generateSlug = (name: string) => {
        const slug = name
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace whitespace with hyphens
            .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens
        return slug;
    };


    const [loading, setLoading] = useState(false)


    const [images, setImages] = useState([])
    const [imagesPrew, setImagesPrew] = useState([])


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
            const res = await addProduct({ name, category, description, images, price, slug, type });
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



    return (
        <>

            <div className='grid grid-cols-2 gap-5'>
                <div className=''>
                    <div className='font-bold pl-5'>Name</div>
                    <input type="text" className='w-[80%] border focus:outline-none rounded-full px-5 py-1' placeholder='Enter the Name' defaultValue={name} onChange={handleNameInput} />
                </div>

                <div className="relative">
                    <div className='font-bold pl-5'>Catagory</div>

                    <div
                        className="w-[80%] border rounded-full py-2 px-4 cursor-pointer"
                        onClick={toggleCatOptions}>
                        <span className='capitalize'>
                            {category ? category : selectedCatOption || 'Select an option'}
                        </span>
                    </div>
                    {selectCatOpen && (
                        <div className="absolute w-[80%] bg-yellow-300 border border-gray-300 rounded-xl mt-1">
                            {categories.map((option) => (
                                <div
                                    key={option}
                                    className="px-4 py-2 hover:bg-red-500 rounded-xl cursor-pointer"
                                    onClick={() => selectCatOption(option)}
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
                    <div className='pl-5 font-bold'>Slug</div>
                    <input value={slug} className='w-[80%] border focus:outline-none rounded-full px-5 py-1' placeholder='slug' />
                </div>

                <div>
                    <div className='pl-5 font-bold'>Price</div>
                    <input type="number" onChange={handlePriceInput} defaultValue={price} className='w-[40%] border focus:outline-none rounded-full px-5 py-1' placeholder='price' />
                </div>

                <div>
                    <div className='pl-5 font-bold'>Stock</div>
                    <input type="number" onChange={handleStockInput} defaultValue={stock} className='w-[40%] border focus:outline-none rounded-full px-5 py-1' placeholder='stock' />
                </div>

                <div className='pl-5 col-span-2'>
                    <div className='text font-bold'>Images</div>
                    <input type='file' onChange={onSelectFile} multiple accept='image/png, image/jpeg, image/webp' />
                    <div className='flex flex-wrap gap-5 my-5'>
                        {
                            imagesPrew.map((image, index) => (
                                <div key={index} className='w-10 h-10 relative'>
                                    <Image
                                        src={image}
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
            {
                loading ?
                    <div className={`text-center w-32 mt-4 hover:bg-black duration-500 ${loading ? 'bg-black' : 'bg-red-600'}  py-2 rounded-full text-white cursor-pointer' onClick={() => handleNewProduct()`}>
                        <div className="w-6 h-6 rounded-full animate-spin border-4 mx-auto border-solid border-white border-t-transparent"></div>
                    </div>
                    :
                    <div onClick={handleNewProduct} className={ `cursor-pointer text-center w-32 mt-4 hover:bg-black duration-500 ${loading ? 'bg-black' : 'bg-red-600'}  py-2 rounded-full text-white cursor-pointer' onClick={() => handleNewProduct()`}>
                        <button className=''>
                            Create
                        </button>
                    </div>
            }
        </>
    )
}

export default CreateProduct





