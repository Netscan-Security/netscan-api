import { Injectable } from '@nestjs/common';

@Injectable()
export class LogsService {

    async fakeLogs(): Promise<string>{
        const logs = [
            {
                "MachineName":  "DESKTOP-RQ3I7IP",
                "Data":  [
        
                         ],
                "Index":  3566,
                "Category":  "(0)",
                "CategoryNumber":  0,
                "EventID":  7040,
                "EntryType":  4,
                "Message":  "The start type of the Background Intelligent Transfer Service service was changed from auto start to demand start.",
                "Source":  "Service Control Manager",
                "ReplacementStrings":  [
                                           "Background Intelligent Transfer Service",
                                           "auto start",
                                           "demand start",
                                           "BITS"
                                       ],
                "InstanceId":  1073748864,
                "TimeGenerated":  "\/Date(1709117220000)\/",
                "TimeWritten":  "\/Date(1709117220000)\/",
                "UserName":  "NT AUTHORITY\\SYSTEM",
                "Site":  null,
                "Container":  null
            },
            {
                "MachineName":  "DESKTOP-RQ3I7IP",
                "Data":  [
        
                         ],
                "Index":  3565,
                "Category":  "(0)",
                "CategoryNumber":  0,
                "EventID":  7040,
                "EntryType":  4,
                "Message":  "The start type of the Background Intelligent Transfer Service service was changed from demand start to auto start.",
                "Source":  "Service Control Manager",
                "ReplacementStrings":  [
                                           "Background Intelligent Transfer Service",
                                           "demand start",
                                           "auto start",
                                           "BITS"
                                       ],
                "InstanceId":  1073748864,
                "TimeGenerated":  "\/Date(1709117071000)\/",
                "TimeWritten":  "\/Date(1709117071000)\/",
                "UserName":  "NT AUTHORITY\\SYSTEM",
                "Site":  null,
                "Container":  null
            },
            {
                "MachineName":  "DESKTOP-RQ3I7IP",
                "Data":  [
        
                         ],
                "Index":  3564,
                "Category":  "(0)",
                "CategoryNumber":  0,
                "EventID":  158,
                "EntryType":  4,
                "Message":  "The time provider \u0027VMICTimeProvider\u0027 has indicated that the current hardware and operating environment is not supported and has stopped. This behavior is expected for VMICTimeProvider on non-HyperV-guest environments. This may be the expected behavior for the current provider in the current operating environment as well.",
                "Source":  "Microsoft-Windows-Time-Service",
                "ReplacementStrings":  [
                                           "VMICTimeProvider"
                                       ],
                "InstanceId":  158,
                "TimeGenerated":  "\/Date(1709109162000)\/",
                "TimeWritten":  "\/Date(1709109162000)\/",
                "UserName":  "NT AUTHORITY\\LOCAL SERVICE",
                "Site":  null,
                "Container":  null
            },
            {
                "MachineName":  "DESKTOP-RQ3I7IP",
                "Data":  [
        
                         ],
                "Index":  3563,
                "Category":  "(0)",
                "CategoryNumber":  0,
                "EventID":  158,
                "EntryType":  4,
                "Message":  "The time provider \u0027VMICTimeProvider\u0027 has indicated that the current hardware and operating environment is not supported and has stopped. This behavior is expected for VMICTimeProvider on non-HyperV-guest environments. This may be the expected behavior for the current provider in the current operating environment as well.",
                "Source":  "Microsoft-Windows-Time-Service",
                "ReplacementStrings":  [
                                           "VMICTimeProvider"
                                       ],
                "InstanceId":  158,
                "TimeGenerated":  "\/Date(1709108138000)\/",
                "TimeWritten":  "\/Date(1709108138000)\/",
                "UserName":  "NT AUTHORITY\\LOCAL SERVICE",
                "Site":  null,
                "Container":  null
            },
            {
                "MachineName":  "DESKTOP-RQ3I7IP",
                "Data":  [
        
                         ],
                "Index":  3562,
                "Category":  "(0)",
                "CategoryNumber":  0,
                "EventID":  158,
                "EntryType":  4,
                "Message":  "The time provider \u0027VMICTimeProvider\u0027 has indicated that the current hardware and operating environment is not supported and has stopped. This behavior is expected for VMICTimeProvider on non-HyperV-guest environments. This may be the expected behavior for the current provider in the current operating environment as well.",
                "Source":  "Microsoft-Windows-Time-Service",
                "ReplacementStrings":  [
                                           "VMICTimeProvider"
                                       ],
                "InstanceId":  158,
                "TimeGenerated":  "\/Date(1709107114000)\/",
                "TimeWritten":  "\/Date(1709107114000)\/",
                "UserName":  "NT AUTHORITY\\LOCAL SERVICE",
                "Site":  null,
                "Container":  null
            }
        ];

        return JSON.stringify(logs);

    }

}
