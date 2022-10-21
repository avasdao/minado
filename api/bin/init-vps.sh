#!/usr/bin/env bash

apt update && apt upgrade -y

#apt install build-essential curl libtool autotools-dev autoconf automake pkg-config libssl-dev libevent-dev libgmp-dev libzmq3-dev bsdmainutils git -y

#apt install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev -y

#apt install libdb-dev libdb++-dev -y

echo
echo "All libraries have been installed!"
echo
echo "Installing Nexa Rocks! data folder..."
echo

tar xf nexa-rocks-97091.tar.gz

echo "Nexa has been configured successfully!"
echo

/root/nexad -daemon -datadir=/root/.nexa-rocks

echo
echo "All done!"
echo
echo "Waiting for node to start..."
echo

sleep 90
/root/nexa-cli getblockcount
echo
