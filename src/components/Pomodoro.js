import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const initialTime = 25 * 60; // 25 dakika
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('pomodoroTime');
    return savedTime ? JSON.parse(savedTime) : initialTime;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(() => {
    const savedBreak = localStorage.getItem('isBreak');
    return savedBreak ? JSON.parse(savedBreak) : false;
  });
  const [sessionCount, setSessionCount] = useState(() => {
    const savedCount = localStorage.getItem('sessionCount');
    return savedCount ? JSON.parse(savedCount) : 0;
  });
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  // Zamanlayıcıyı başlatma/durdurma fonksiyonu
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Atla fonksiyonu
  const skipTimer = () => {
    if (isBreak) {
      setIsBreak(false);
      setTime(25 * 60); // Çalışma süresi 25 dakika
      setSessionCount((prevCount) => prevCount + 1);
    } else {
      setIsBreak(true);
      setTime(5 * 60); // Mola süresi 5 dakika
    }
    setIsRunning(false);
  };

  // useEffect ile zamanlayıcıyı kontrol et
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsBreak(!isBreak);
            if (!isBreak) {
              setSessionCount((prevCount) => prevCount + 1);
            }
            return isBreak ? 25 * 60 : 5 * 60;
          }
        });
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak, time]);

  // Sayfa yeniden yüklendiğinde isBreak ve time durumunu güncelle
  useEffect(() => {
    if (time === 5 * 60) {
      setIsBreak(true);
    } else if (time === 25 * 60) {
      setIsBreak(false);
    }
  }, [time]);

  // Local storage'a güncellemeler
  useEffect(() => {
    localStorage.setItem('pomodoroTime', JSON.stringify(time));
    localStorage.setItem('sessionCount', JSON.stringify(sessionCount));
    localStorage.setItem('isBreak', JSON.stringify(isBreak));
  }, [time, sessionCount, isBreak]);

  // Kartın arka plan rengini belirle

  return (
    <div
      className={`pomodoro-container text-center mt-10 bg-gray-500 p-6 rounded-lg shadow-lg`}
    >
      <h1 className="text-2xl font-bold text-white">
        {isBreak ? 'Mola Zamanı' : 'Çalışma Zamanı'}
      </h1>
      <div className="timer mt-4 text-4xl font-semibold text-white">
        {formatTime(time)}
      </div>
      <div className="session-count text-white mt-2">
        {!isBreak ? `Çalışma Zamanı: ${sessionCount}` : 'Mola süresi'}
      </div>
      <div className="controls mt-6 flex flex-col items-center space-y-2">
        <div className="flex justify-center space-x-4 mb-2">
          <button
            onClick={toggleTimer}
            className="bg-orange-300 text-white py-2 px-4 rounded"
          >
            {isRunning ? 'Duraklat' : 'Başlat'}
          </button>

          <button
            onClick={skipTimer}
            className="bg-orange-300 text-white py-4 px-2 rounded flex-1 flex items-center justify-center"
          >
            <i className="fa fa-arrow-right "></i> {/* İleri ok simgesi */}
          </button>
        </div>
        {/* Tam genişlikte sıfırlama butonu */}
        <button
          onClick={() => {
            setTime(isBreak ? 5 * 60 : 25 * 60); // Zamanlayıcıyı sıfırla
            setSessionCount(0); // Oturum sayısını sıfırla
          }}
          className="bg-orange-300 text-white py-2 px-4 rounded "
        >
          Çalışma Zamanını Sıfırla
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
