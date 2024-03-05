
const Enroll = ({ labs }: { labs: any }) => {
  return (
    <div>
      <h2>Enrolls Ready</h2>
      {
        labs.map((lab: any) => (
          <div key={lab} className="flex flex-row bg-lime-300 mx-4">
            <h3 className="font-bold" >{lab}</h3>
          </div>
        ))
      }
    </div>
  )
}

export default Enroll