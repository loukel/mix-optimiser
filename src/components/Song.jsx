const Song = ({ id, name, bpm, songKey, index, updateName, removeSong }) => {
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

  const gradient = generate()

  const onBlur = (e) => {
    updateName(id, e.target.textContent)
  }

  return (
    <div className='card bg-base-100 w-full flex-row p-2 rounded-none shadow-xl shadow-primary mb-6 last:mb-0'>
      <div
        style={{
          background: gradient,
          minWidth: '50px',
          minHeight: '50px',
          maxWidth: '50px',
          maxHeight: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className='m-5 text-center text-white text-4xl truncate'
      >
        {/* {getInitials(name)} */}
        {index + 1}
      </div>
      <div className='flex flex-col ml-4 grow text-left my-auto text-2xl bold font-bold'>
        <div
          contentEditable={true}
          onBlur={onBlur}
          suppressContentEditableWarning={true}
        >
          {name}
        </div>
      </div>
      <div className='flex flex-col ml-4 float-right w-16 my-auto text-md bold font-bold'>
        <div>{songKey}</div>
        <div>{bpm}bpm</div>
      </div>
      <button onClick={() => removeSong(id)}>X</button>
    </div>
  )
}

export default Song
