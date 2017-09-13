const socketEvents = (io) => {
  io.on('connection', (socket) => {
    socket.join('General');
    socket.on('chat mounted', (user) => {
      socket.emit('receive socket', socket.id);
    });
    socket.on('leave channel', (group) => {
      socket.leave(group);
    });
    socket.on('join channel', (group) => {
      socket.join(group.name);
    });
    socket.on('new message', (msg) => {
      socket.broadcast.to(msg.groupID).emit('new bc message', msg);
    });
    socket.on('new group', (group) => {
      socket.broadcast.emit('new group', group);
    });
    socket.on('typing', (data) => {
      socket.broadcast.to(data.group).emit('typing bc', data.user);
    });
    socket.on('stop typing', (data) => {
      socket.broadcast.to(data.group).emit('stop typing bc', data.user);
    });
  });
};

export default socketEvents;
