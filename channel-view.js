
const channels = [
    {
        name: "#random",
        posts: [
            {
                from: "Natalie",
                text: "fdsjfkdslfjds"
            },
            {
                from: "Mike",
                text: "Hey there"
            }
        ]
    },
    {
        name: "#general",
        posts: []
    }
];

const $channelContainer = $("#channel-container")

$(() => {
    // run some code
    renderAllChannels();
})

function renderAllChannels() {
    for(const channel of channels) {
        $channelContainer.append(renderChannel(channel));
    }
}

function renderChannel(channel) {
    return $channelDiv = $('<div><h4>' + channel.name + "</h4></div>")
        .append(renderAllPosts(channel.posts));
}

function renderAllPosts(posts) {
    const $postList = $('<ul class="list-group"></ul>');
    const allPostListItems = posts.map(post => renderPost(post))
    for(const postListItem of allPostListItems) {
        $postList.append(postListItem);
    }
    return $postList
}

function renderPost(post) {
    return $('<li class="list-group-item">' + post.from + ": " + post.text + "</li>");
}

function renderAllTags() {
    return $("<div/>")
}

// [
//     {
//         from: "Natalie",
//         text: "fdsjfkdslfjds"
//     },
//     {
//         from: "Mike",
//         text: "Hey there"
//     }
// ]

// [
//     <li>Natalie: fdsfdsfsd</div>,
//     <div>Mike: Hey there</div>
// ]