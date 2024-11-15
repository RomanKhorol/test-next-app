import { CarType } from "@/models/carType";
import { FC } from "react";
interface PropsType {
  car: CarType;
}
const Car: FC<PropsType> = ({ car }) => {
  return (
    <div>
      <h3>{car.Make_Name}</h3>
      <p>{`produed in ${car.Model_ID}`}</p>
    </div>
  );
};
export default Car;
