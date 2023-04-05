import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const SearchMovie = ({ onSearchChange }) => {
  return (
    <div className="max-w-xl mx-auto pt-16 px-4">
      <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="md"
        label="Search Movie Title"
        placeholder="Avengers: Infinity War"
        rightSectionWidth={42}
        onChange={(event) => onSearchChange(event.target.value)} // Call the callback function when input changes
      />
    </div>
  );
};

export default SearchMovie;
