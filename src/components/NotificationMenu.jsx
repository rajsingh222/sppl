import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  Flex,
  Badge,
  VStack,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import React from "react";

const palette = {
  hoverGray: "gray.300",
  textBlue: "blue.600",
  descGray: "gray.600",
  badgeRed: "red.500",
  badgeText: "white",
  menuBg: "red.50",
  noNotifBlue: "blue.300",
  bellGold: "gold",
};

const NotificationMenu = () => {
  // Sample notifications array with three messages
  const notifications = [
    {
      id: 1,
      title: "New Message",
      description: "You received a message from John.",
      status: "unread",
    },
    {
      id: 2,
      title: "Server Alert",
      description: "Your server is experiencing high load. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorem eveniet? Ducimus voluptas ad ipsam dolorem cumque beatae, recusandae repudiandae corporis sit consectetur at quis accusamus iste culpa fugiat quod",
      status: "unread",
    },
    {
      id: 4,
      title: "Server Alert",
      description: "Your server is experiencing high load. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorem eveniet? Ducimus voluptas ad ipsam dolorem cumque beatae, recusandae repudiandae corporis sit consectetur at quis accusamus iste culpa fugiat quod",
      status: "unread",
    },
    {
      id: 5,
      title: "Server Alert",
      description: "Your server is experiencing high load. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorem eveniet? Ducimus voluptas ad ipsam dolorem cumque beatae, recusandae repudiandae corporis sit consectetur at quis accusamus iste culpa fugiat quod",
      status: "unread",
    },
    {
      id: 3,
      title: "Comment",
      description: "Anna commented on your post.",
      status: "read",
    },
  ];

  // Render function for each notification item
  const renderNotificationItem = (notification) => (
    <MenuItem key={notification.id} py="3" _hover={{ bg: palette.hoverGray }}  overFlowy="auto">
      <Flex direction="column">
        <Text fontWeight="bold" color={palette.textBlue}>
          {notification.title} {"Marked as read"}
        </Text>
        <Text fontSize="sm" color={palette.descGray}>
          {notification.description}
        </Text>
      </Flex>
    </MenuItem>
  );

  return (
    <Menu>
      <MenuButton
        mx={"20px"}
        as={IconButton}
        icon={<BellIcon boxSize="7" color={palette.bellGold} />}
        variant="ghost"
        border="none"
        position="relative"
        aria-label="Notifications"
        transition="transform 0.2s ease"
        _hover={{ transform: "scale(1.1)" }}
      >
        {/* Badge showing the number of notifications */}
        <Badge
          position="absolute"
          top="0"
          right="0"
          transform="translate(-100%, 50%)"
          zIndex="1300"
          bg={palette.badgeRed}
          borderRadius="full"
          px="2"
          fontSize="0.8em"
          color={palette.badgeText}
        >
          3
        </Badge>

      </MenuButton>
      <MenuList maxW="300px" bg={palette.menuBg} maxH="400px" overflowY="auto">
        <VStack spacing={1} align="stretch">
          {notifications.length > 0
            ? notifications.map((notification) =>
              renderNotificationItem(notification)
            )
            : (
              <MenuItem disabled>
                <Text color={palette.noNotifBlue}>No new notifications</Text>
              </MenuItem>
            )}
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default NotificationMenu;