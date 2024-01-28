import banner from "../../assets/bannerImg.jpeg"
const Banner = () => {
  return (
    <div className='max-w-[1400px] mx-auto mt-8'>
      <img src={banner} className="object-cover h-[180px]  w-full" alt="" />
    </div>
  )
}

export default Banner
