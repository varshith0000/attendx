import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArcElement, Chart as ChartJS, CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Activity, Calculator, Home, User, ChartColumnBig } from 'lucide-react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Recharts from 'recharts';
