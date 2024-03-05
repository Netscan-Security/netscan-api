import { Controller, Get } from '@nestjs/common';

@Controller('logs')
export class LogsController {
    @Get('machine/*')
    /*
        of course this request will be relayed to the host machine
        we did this to just get Jackson and Elia to stop bugging us 😂
        Just playing with you guys, we love you 😘
        But sure, we will rely on the host machine to get the actual logs
    */
    getLogs() {
        const logs = [
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1709299664000)/",
                "Index": 4110,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80073d02: 9NMPJ99VJBWV-Microsoft.YourPhone."
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1709125715000)/",
                "Index": 3572,
                "Message": "The previous system shutdown at 4:27:58 AM on ?2/?28/?2024 was unexpected."
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1708677653000)/",
                "Index": 3045,
                "Message": "The previous system shutdown at 12:08:43 AM on ?2/?23/?2024 was unexpected."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1708620695000)/",
                "Index": 2921,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80073d02: 9MSSGKG348SP-MicrosoftWindows.Client.WebExperience."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1708619133000)/",
                "Index": 2826,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80073d02: 9N0DX20HK701-Microsoft.WindowsTerminal."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1708611920000)/",
                "Index": 2769,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80240016: 9NBLGGH3FRZM-Microsoft.VCLibs.140.00."
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1708603779000)/",
                "Index": 2721,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{E60687F7-01A1-40AA-86AC-DB1CBF673334}'"
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1708603659000)/",
                "Index": 2720,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{E60687F7-01A1-40AA-86AC-DB1CBF673334}'"
            },
            {
                "EventID": 36,
                "InstanceId": 3221618724,
                "TimeGenerated": "/Date(1708076635000)/",
                "Index": 2584,
                "Message": "The shadow copies of volume C: were aborted because the shadow copy storage could not grow due to a user imposed limit."
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1708073113000)/",
                "Index": 2470,
                "Message": "The previous system shutdown at 10:39:42 PM on ?2/?8/?2024 was unexpected."
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1707461845000)/",
                "Index": 2437,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{FD06603A-2BDF-4BB1-B7DF-5DC68F353601}'"
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1707460782000)/",
                "Index": 2315,
                "Message": "The previous system shutdown at 12:00:53 PM on ?1/?23/?2024 was unexpected."
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1705994451000)/",
                "Index": 2172,
                "Message": "The previous system shutdown at 9:21:17 AM on ?1/?22/?2024 was unexpected."
            },
            {
                "EventID": 29,
                "InstanceId": 29,
                "TimeGenerated": "/Date(1705994423000)/",
                "Index": 2161,
                "Message": "The description for Event ID '29' in Source 'Microsoft-Windows-Kernel-Boot' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'3221225684', 'A fatal error occurred processing the restoration data.\r\n'"
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705913205000)/",
                "Index": 2073,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{8CFC164F-4BE5-4FDD-94E9-E2AF73ED4A19}'"
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705910853000)/",
                "Index": 2045,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{8CFC164F-4BE5-4FDD-94E9-E2AF73ED4A19}'"
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1705910476000)/",
                "Index": 1964,
                "Message": "The previous system shutdown at 4:52:59 AM on ?1/?20/?2024 was unexpected."
            },
            {
                "EventID": 29,
                "InstanceId": 29,
                "TimeGenerated": "/Date(1705910443000)/",
                "Index": 1952,
                "Message": "The description for Event ID '29' in Source 'Microsoft-Windows-Kernel-Boot' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'3221225684', 'A fatal error occurred processing the restoration data.\r\n'"
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705753146000)/",
                "Index": 1930,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{8CFC164F-4BE5-4FDD-94E9-E2AF73ED4A19}'"
            },
            {
                "EventID": 29,
                "InstanceId": 29,
                "TimeGenerated": "/Date(1705752725000)/",
                "Index": 1820,
                "Message": "The description for Event ID '29' in Source 'Microsoft-Windows-Kernel-Boot' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'3221225684', 'A fatal error occurred processing the restoration data.\r\n'"
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1705752779000)/",
                "Index": 1815,
                "Message": "The previous system shutdown at 10:19:31 AM on ?1/?19/?2024 was unexpected."
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705671290000)/",
                "Index": 1799,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{8CFC164F-4BE5-4FDD-94E9-E2AF73ED4A19}'"
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705668569000)/",
                "Index": 1794,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80073d02: 9NCBCSZSJRSB-SpotifyAB.SpotifyMusic."
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705667420000)/",
                "Index": 1780,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{8CFC164F-4BE5-4FDD-94E9-E2AF73ED4A19}'"
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1705601932000)/",
                "Index": 1672,
                "Message": "The previous system shutdown at 8:59:37 AM on ?1/?18/?2024 was unexpected."
            },
            {
                "EventID": 29,
                "InstanceId": 29,
                "TimeGenerated": "/Date(1705601888000)/",
                "Index": 1661,
                "Message": "The description for Event ID '29' in Source 'Microsoft-Windows-Kernel-Boot' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'3221225684', 'A fatal error occurred processing the restoration data.\r\n'"
            },
            {
                "EventID": 7034,
                "InstanceId": 3221232506,
                "TimeGenerated": "/Date(1705559214000)/",
                "Index": 1613,
                "Message": "The VirtualBox system service service terminated unexpectedly.  It has done this 1 time(s)."
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705559167000)/",
                "Index": 1609,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{8CFC164F-4BE5-4FDD-94E9-E2AF73ED4A19}'"
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1705558776000)/",
                "Index": 1529,
                "Message": "The previous system shutdown at 10:56:20 AM on ?1/?17/?2024 was unexpected."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705498269000)/",
                "Index": 1501,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80073d02: 9WZDNCRFJBMP-MICROSOFT.WINDOWSSTORE."
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705405402000)/",
                "Index": 1295,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'Windows.Internal.StateRepository.ApplicationExtension'"
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705405397000)/",
                "Index": 1294,
                "Message": "The SysMain service terminated with the following error: \r\n%%1747"
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1288,
                "Message": "The LanmanServer service failed to start due to the following error: \r\n%%1069"
            },
            {
                "EventID": 7038,
                "InstanceId": 3221232510,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1287,
                "Message": "The LanmanServer service was unable to log on as NT AUTHORITY\\SYSTEM with the currently configured password due to the following error: \r\n%%50\r\n\r\nTo ensure that the service is configured properly, use the Services snap-in in Microsoft Management Console (MMC)."
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1286,
                "Message": "The WinDefend service failed to start due to the following error: \r\n%%1069"
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1285,
                "Message": "The TrkWks service failed to start due to the following error: \r\n%%1069"
            },
            {
                "EventID": 7001,
                "InstanceId": 3221232473,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1284,
                "Message": "The wtd service depends on the BFE service which failed to start because of the following error: \r\n%%1115"
            },
            {
                "EventID": 7038,
                "InstanceId": 3221232510,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1283,
                "Message": "The WinDefend service was unable to log on as NT AUTHORITY\\SYSTEM with the currently configured password due to the following error: \r\n%%50\r\n\r\nTo ensure that the service is configured properly, use the Services snap-in in Microsoft Management Console (MMC)."
            },
            {
                "EventID": 7038,
                "InstanceId": 3221232510,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1282,
                "Message": "The TrkWks service was unable to log on as NT AUTHORITY\\SYSTEM with the currently configured password due to the following error: \r\n%%50\r\n\r\nTo ensure that the service is configured properly, use the Services snap-in in Microsoft Management Console (MMC)."
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1281,
                "Message": "The WpnService service failed to start due to the following error: \r\n%%1069"
            },
            {
                "EventID": 7038,
                "InstanceId": 3221232510,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1280,
                "Message": "The WpnService service was unable to log on as NT AUTHORITY\\SYSTEM with the currently configured password due to the following error: \r\n%%50\r\n\r\nTo ensure that the service is configured properly, use the Services snap-in in Microsoft Management Console (MMC)."
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1279,
                "Message": "The DPS service failed to start due to the following error: \r\n%%1069"
            },
            {
                "EventID": 7038,
                "InstanceId": 3221232510,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1278,
                "Message": "The DPS service was unable to log on as NT AUTHORITY\\LocalService with the currently configured password due to the following error: \r\n%%50\r\n\r\nTo ensure that the service is configured properly, use the Services snap-in in Microsoft Management Console (MMC)."
            },
            {
                "EventID": 7001,
                "InstanceId": 3221232473,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1277,
                "Message": "The iphlpsvc service depends on the WinHttpAutoProxySvc service which failed to start because of the following error: \r\n%%1068"
            },
            {
                "EventID": 7001,
                "InstanceId": 3221232473,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1276,
                "Message": "The WinHttpAutoProxySvc service depends on the Dhcp service which failed to start because of the following error: \r\n%%1069"
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1275,
                "Message": "The Dhcp service failed to start due to the following error: \r\n%%1069"
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1274,
                "Message": "The DiagTrack service failed to start due to the following error: \r\n%%1069"
            },
            {
                "EventID": 7038,
                "InstanceId": 3221232510,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1273,
                "Message": "The Dhcp service was unable to log on as NT Authority\\LocalService with the currently configured password due to the following error: \r\n%%50\r\n\r\nTo ensure that the service is configured properly, use the Services snap-in in Microsoft Management Console (MMC)."
            },
            {
                "EventID": 7038,
                "InstanceId": 3221232510,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1272,
                "Message": "The DiagTrack service was unable to log on as NT AUTHORITY\\SYSTEM with the currently configured password due to the following error: \r\n%%50\r\n\r\nTo ensure that the service is configured properly, use the Services snap-in in Microsoft Management Console (MMC)."
            },
            {
                "EventID": 7001,
                "InstanceId": 3221232473,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1271,
                "Message": "The mpssvc service depends on the BFE service which failed to start because of the following error: \r\n%%1115"
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705405390000)/",
                "Index": 1270,
                "Message": "The BFE service terminated with the following error: \r\n%%1115"
            },
            {
                "EventID": 6008,
                "InstanceId": 2147489656,
                "TimeGenerated": "/Date(1705405391000)/",
                "Index": 1186,
                "Message": "The previous system shutdown at 1:18:42 PM on ?1/?15/?2024 was unexpected."
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705329477000)/",
                "Index": 1139,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{08949FF9-54D2-47CB-9B3F-82E9ACC93DF1}'"
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705329477000)/",
                "Index": 1138,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{A28430CA-1EBF-48DD-AA17-9221B6F86A6C}'"
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705095281000)/",
                "Index": 1105,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80073d02: 9MSSGKG348SP-MicrosoftWindows.Client.WebExperience."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705095003000)/",
                "Index": 974,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80240016: 9P105T65H4Z5-Microsoft.WindowsAppRuntime.1.3."
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705080500000)/",
                "Index": 739,
                "Message": "The Intel(R) Content Protection HECI Service service terminated with the following error: \r\n%%2147942659"
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705080401000)/",
                "Index": 653,
                "Message": "The cphs service failed to start due to the following error: \r\n%%1053"
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705080396000)/",
                "Index": 647,
                "Message": "The SysMain service terminated with the following error: \r\n%%1747"
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705080394000)/",
                "Index": 646,
                "Message": "The LanmanServer service terminated with the following error: \r\n%%1115"
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705080388000)/",
                "Index": 639,
                "Message": "The WinDefend service failed to start due to the following error: \r\n%%1053"
            },
            {
                "EventID": 7009,
                "InstanceId": 3221232481,
                "TimeGenerated": "/Date(1705080388000)/",
                "Index": 638,
                "Message": "A timeout was reached (45000 milliseconds) while waiting for the WinDefend service to connect."
            },
            {
                "EventID": 7000,
                "InstanceId": 3221232472,
                "TimeGenerated": "/Date(1705080384000)/",
                "Index": 609,
                "Message": "The AppIDSvc service failed to start due to the following error: \r\n%%1053"
            },
            {
                "EventID": 7009,
                "InstanceId": 3221232481,
                "TimeGenerated": "/Date(1705080384000)/",
                "Index": 608,
                "Message": "A timeout was reached (45000 milliseconds) while waiting for the AppIDSvc service to connect."
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705079936000)/",
                "Index": 528,
                "Message": "The Windows Modules Installer service terminated with the following error: \r\n%%32"
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705079759000)/",
                "Index": 526,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x800704c7: 2024-01 Cumulative Update for Windows 11 Version 22H2 for x64-based Systems (KB5034123)."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705079215000)/",
                "Index": 498,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80240017: 2022-08 Security Update for Windows 11 22H2 for x64-based Systems (KB5012170)."
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705076598000)/",
                "Index": 467,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{AB8902B4-09CA-4BB6-B78D-A8F59079A8D5}'"
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705076490000)/",
                "Index": 422,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80240016: 9NBLGGH4RV3K-Microsoft.VCLibs.140.00.UWPDesktop."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705076475000)/",
                "Index": 406,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80073d02: 9MSSGKG348SP-MicrosoftWindows.Client.WebExperience."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705076307000)/",
                "Index": 368,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80240016: Realtek Semiconductor Corp. driver update for Realtek High Definition Audio."
            },
            {
                "EventID": 20,
                "InstanceId": 20,
                "TimeGenerated": "/Date(1705076305000)/",
                "Index": 366,
                "Message": "Installation Failure: Windows failed to install the following update with error 0x80240016: Realtek Semiconductor Corp. driver update for Realtek High Definition Audio."
            },
            {
                "EventID": 7001,
                "InstanceId": 3221232473,
                "TimeGenerated": "/Date(1705115014000)/",
                "Index": 192,
                "Message": "The Connected Devices Platform Service service depends on the Network Connection Broker service which failed to start because of the following error: \r\n%%1070"
            },
            {
                "EventID": 7022,
                "InstanceId": 3221232494,
                "TimeGenerated": "/Date(1705115013000)/",
                "Index": 191,
                "Message": "The Network Connection Broker service hung on starting."
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705115009000)/",
                "Index": 187,
                "Message": "The Network List Service service terminated with the following error: \r\n%%21"
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705115009000)/",
                "Index": 186,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{A47979D2-C419-11D9-A5B4-001185AD2B89}'"
            },
            {
                "EventID": 7030,
                "InstanceId": 3221232502,
                "TimeGenerated": "/Date(1705114896000)/",
                "Index": 142,
                "Message": "The Printer Extensions and Notifications service is marked as an interactive service.  However, the system is configured to not allow interactive services.  This service may not function properly."
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705114888000)/",
                "Index": 136,
                "Message": "The Network List Service service terminated with the following error: \r\n%%21"
            },
            {
                "EventID": 10010,
                "InstanceId": 10010,
                "TimeGenerated": "/Date(1705114888000)/",
                "Index": 135,
                "Message": "The description for Event ID '10010' in Source 'DCOM' cannot be found.  The local computer may not have the necessary registry information or message DLL files to display the message, or you may not have permission to access them.  The following information is part of the event:'{A47979D2-C419-11D9-A5B4-001185AD2B89}'"
            },
            {
                "EventID": 7023,
                "InstanceId": 3221232495,
                "TimeGenerated": "/Date(1705114768000)/",
                "Index": 53,
                "Message": "The netprofm service terminated with the following error: \r\n%%21"
            }
        ];
        return logs;
    }
}
