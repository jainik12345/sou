import BgImg from "../../../../assets/images/gtbg.png"

export const StayInTentDropDownBg = () => {
    return (

        <>
            <div
                className=" bg-cover bg-center bg-fixed h-[250px] w-full "
                style={{ backgroundImage: `url(${BgImg})` }}>
            </div>
        </>
    )
}