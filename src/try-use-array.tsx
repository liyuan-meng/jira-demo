import {useMount, useArray} from "./utils";

interface Person {
    name: string;
    age: number;
}

const TsReactTest = () => {
    const persons: Array<Person> = [
        { name: 'John', age: 12 },
        { name: 'Jack', age: 10 }
    ];
    const [values, clear, removeIndex, add] = useArray(persons);

    useMount(() => {
        // console.log(values.notExist);
        // add({ name: 'David' });
        // removeIndex('123');
    });

    return (
        <div>
            <button onClick={() => add({ name: 'Ann', age: 11 })}>add Ann</button>
            <button onClick={() => removeIndex(0)}>remove 0</button>
            <button style={{ marginBottom: 50 }} onClick={() => clear()}>clear</button>
            {values.map((person, index) => (
                <div style={{ marginBottom: 30 }}>
                    <span style={{ color: 'red' }}>{index}</span>
                    <span>{person.name}</span>
                    <span>{person.age}</span>
                </div>
            ))}
        </div>
    );
}

export default TsReactTest;
