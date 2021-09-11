import { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let content = "";

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://food-delivery-21098-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("Error 404, NOT FOUND");
        }

        const data = await response.json();
        const loadedData = [];

        for (let key in data) {
          loadedData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedData);
      } catch (err) {
        setError(err?.message || "something went wrong!!");
      }
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (error) {
    content = (
      <Card>
        <p className={classes["error-msg"]}>{error}</p>
      </Card>
    );
  }

  if (isLoading) {
    content = (
      <Card>
        <p className={classes["loading-msg"]}>Loading...</p>
      </Card>
    );
  }

  if (!isLoading && !error) {
    content = <Card>{mealsList}</Card>;
  }

  return (
    <section className={classes.meals}>
      {/* <Card>{isLoading ? "Loading..." : <ul>{mealsList}</ul>}</Card> */}
      {content}
    </section>
  );
};

export default AvailableMeals;
