#!/bin/sh
printf "Discord 0.0.17\n"
sleep 1
printf "Discord native client for FreeBSD\n"
sleep 0.2
install() {
	sleep 0.2
	printf "Installing Discord 0.0.17 ...\n"
	mkdir -p ~/.local/share/discord-bsd
	mkdir -p ~/.local/bin
	mkdir -p ~/.local/share/applications
	cp -rv ./* ~/.local/share/discord-bsd
	mv -v ~/.local/share/discord-bsd/discord.desktop ~/.local/share/applications/
	mv -v ~/.local/share/discord-bsd/discord ~/.local/bin
	sed -i '' "s/Exec=auto1/Exec=\/home\/$USER\/.local\/bin\/discord/" ~/.local/share/applications/discord.desktop
	sleep 2
	sed -i '' "s/Icon=auto2/Icon=\/home\/$USER\/.local\/share\/discord-bsd\/discord.png/" ~/.local/share/applications/discord.desktop
	cd /home/$USER/.local/share/discord-bsd
	npm install
	printf "Discord 0.0.17 installed!\n"
}
printf "Launching installer...\n" && install
