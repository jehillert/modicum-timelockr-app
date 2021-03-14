// This is where you put things you don't want to delete,
// but that are uglying up your code in commented form.

const getDrawerScreenHeader = ({ scene }) => {
    const { options } = scene.descriptor;
    const title =
        options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
            ? options.title
            : scene.route.name;

    return (
        <MyHeader
            title={title}
            leftButton={<DrawerToggleButton onPress={scene.descriptor.navigation.toggleDrawer} />}
            style={options.headerStyle}
        />
    );
};
