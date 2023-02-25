import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import activityIcon from "../images/activity.jpg";
import techTalkIcon from "../images/tech_talk.jpg";
import workshopIcon from "../images/workshop.jpg";

const EventCard = ({ event, relatedEvents }) => {
  return (
    <Card maxW="md">
      <CardHeader>
        <Heading as="h5" size="lg">
          {event.name}
        </Heading>
        <Image
          boxSize="250px"
          objectFit="cover"
          borderRadius="md"
          mx="auto"
          src={
            event.event_type === "workshop"
              ? workshopIcon
              : event.event_type === "activity"
              ? activityIcon
              : techTalkIcon
          }
        />
      </CardHeader>

      <CardBody>
        <div style={{ display: "flex" }}>
          {event.speakers.map((speaker, index) => (
            <div key={index} style={{ marginRight: "1rem" }}>
              <Text as="b">Speaker: {speaker.name}</Text>
              {/* This will be blank for now since the image link does not lead to an image
              <Image
                size="100px"
                objectFit="cover"
                src={speaker.profile_pic}
                style={{ marginLeft: "auto" }}
              /> */}
            </div>
          ))}
        </div>
        <Stack mt="6" spacing="3">
          <Text>Start Time: {new Date(event.start_time).toLocaleString()}</Text>
          <Text>End Time: {new Date(event.end_time).toLocaleString()}</Text>
          <Text fontSize="sm">{event.description}</Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <div>
          <Button
            onClick={() => (window.location.href = event.private_url)}
            color="blue.400"
          >
            Event Details
          </Button>
        </div>
        <div>
          {event.public_url && (
            <Button
              onClick={() => (window.location.href = event.public_url)}
              color="red.400"
              ml={4}
            >
              Watch on Youtube
            </Button>
          )}
        </div>
      </CardFooter>

      {relatedEvents.length !== 0 && (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            View Related Events
          </MenuButton>
          <MenuList>
            {relatedEvents.map((event) => (
              <MenuItem
                onClick={() =>
                  (window.location.href = event.public_url
                    ? event.public_url
                    : event.private_url)
                }
              >
                {event.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </Card>
  );
};

export default EventCard;
