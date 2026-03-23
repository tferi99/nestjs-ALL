if [ $# -ne 1 ]
then
	app=`basename $0`
	echo "Usage: $app <host>"
	exit 1
fi

host=$1
NAME=nest-deploy-demo
PKG=${NAME}.tgz
DIST=dist
START_SCRIPT=start_service.sh
STOP_SCRIPT=stop_service.sh

if [ ! -d ${DIST} ]
then
	read -p "Do you want to init log files (y/n)? " doInit
	if [ "$doInit" == 'y' ]
	then
		nest build
		if [ $? -ne 0 ]
		then
			echo 'BUILD ERROR' 1>&2
			exit
		fi
	fi
fi

echo "Packaging files..."
cp package.json ${DIST}
cp package-lock.json ${DIST}
tar cvzf $PKG $DIST
echo

echo "Copying files..."
target="root@${host}:/root/${NAME}.tgz"
scp ${NAME}.tgz ${target}
if [ $? -ne 0 ]
then
	echo "Error during copying file to $host"
	exit 2
fi

echo "Initialization..."
ssh ${host} -l root "
	cd ~
	rm -rf ${NAME} 2>/dev/null
	
	tar xvzf ${NAME}.tgz
	mv ${DIST} ${NAME}
	chown root:root ~/${NAME}/*
	rm -rf ~/${NAME}.tgz
	cd ${NAME}
	ln -s main.js ${NAME}.js
	
	echo 'npm i' > init.sh
	chmod +x init.sh
	
	echo -n 'pm2 start ' > ${START_SCRIPT}
	echo ${NAME}.js >> ${START_SCRIPT}
	chmod +x ${START_SCRIPT}
	
	echo -n 'pm2 stop ' > ${STOP_SCRIPT}
	echo ${NAME}.js >> ${STOP_SCRIPT}
	chmod +x ${STOP_SCRIPT}
"
if [ $? -ne 0 ]
then
	echo "Error during initialization!"
	exit 3
fi

rm $PKG
rm ${DIST}/package.json
rm ${DIST}/package-lock.json

echo ""
echo "============================= OK ===================================="


