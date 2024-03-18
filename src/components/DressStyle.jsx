function DressStyle() {
  // const dressStyle = [
  //   { name: 'Casual', imgSrc: 'images/dressStyle/casual.png' },
  //   { name: 'Formal', imgSrc: 'images/dressStyle/formal.png' },
  //   { name: 'Party', imgSrc: 'images/dressStyle/party.png' },
  //   { name: 'Gym', imgSrc: 'images/dressStyle/gym.png' },
  // ]

  return (
    <div className="mx-4 mb-4 flex justify-center md:mb-8 lg:mx-24 lg:mb-16">
      <div className="w-[1289px] rounded-[1.3rem] bg-[#F0F0F0] px-4 pt-[40px] md:px-8 lg:rounded-[2.5rem] lg:px-16 lg:pt-[70px]">
        <h2 className="text-center font-integral_cf text-[32px] lg:text-5xl">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="grid grid-cols-1 gap-8 py-7 *:relative *:h-48 *:rounded-3xl *:bg-cover *:bg-top *:font-satoshi_bold *:text-2xl md:grid-cols-5 md:*:h-72 lg:grid-cols-7 lg:py-16 lg:*:text-4xl">
          <div className="style-casual bg-[url('images/dressStyle/casual.png')] md:col-span-2 lg:col-span-3">
            <h3 className="absolute left-6 top-9">Casual</h3>
          </div>
          <div className="style-formal bg-[url('images/dressStyle/formal.png')] md:col-span-3 lg:col-span-4">
            <h3 className="absolute left-6 top-9">Formal</h3>
          </div>
          <div className="style-party bg-[url('images/dressStyle/party.png')] md:col-span-3 lg:col-span-4">
            <h3 className="absolute left-6 top-9">Party</h3>
          </div>
          <div className="style-gym bg-[url('images/dressStyle/gym.png')] md:col-span-2 lg:col-span-3">
            <h3 className="absolute left-6 top-9">Gym</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DressStyle
