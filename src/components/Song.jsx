const Song = ({ name, bpm, songKey }) => {
  function createHex() {
    var hexCode1 = ''
    var hexValues1 = '0123456789abcdef'

    for (var i = 0; i < 6; i++) {
      hexCode1 += hexValues1.charAt(
        Math.floor(Math.random() * hexValues1.length)
      )
    }
    return hexCode1
  }

  function generate() {
    var deg = Math.floor(Math.random() * 360)

    var gradient =
      'linear-gradient(' +
      deg +
      'deg, ' +
      '#' +
      createHex() +
      ', ' +
      '#' +
      createHex() +
      ')'

    return gradient

    // console.log(hexCode1, hexCode2)
  }

  function getInitials(inputString) {
    const words = inputString.split(' ')
    const initials = words.map((word) => word.charAt(0).toUpperCase())
    return initials.join('')
  }

  return (
    <div className='card bg-base-100 w-full flex-row p-2 rounded-none shadow-xl shadow-indigo-500 mb-6 last:mb-0'>
      <div
        style={{
          background: generate(),
          width: '100px',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className='m-5 text-center text-white text-4xl'
      >
        {getInitials(name)}
      </div>
      <div className='flex flex-col ml-4 grow text-left my-auto text-2xl bold font-bold'>
        <div>{name}</div>
      </div>
      <div className='flex flex-col ml-4 float-right w-16 my-auto text-md bold font-bold'>
        <div>{songKey}</div>
        {/* <div>{bpm}bpm</div> */}
      </div>
    </div>
  )
}

export default Song
