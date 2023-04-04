import { TextInput, TextInputProps, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";

const SearchMovie = (/*props: TextInputProps*/) => {
  return (
    <div className="max-w-xl mx-auto pt-16 px-4">
      <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="md"
        label="Search Movie Title"
        rightSection={
          <ActionIcon size={32} radius="xl" color="indigo-500" variant="light">
            <IconArrowRight size="1.1rem" stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Avengers: Infinity War"
        rightSectionWidth={42}
        //{...props}
      />
    </div>
  );
};

export default SearchMovie;
