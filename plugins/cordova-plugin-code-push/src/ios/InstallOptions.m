#include "InstallOptions.h"

@implementation InstallOptions

NSString* const RollbackTimeoutKey = @"rollbackTimeout";
NSString* const InstallModeKey = @"installMode";

-(void)encodeWithCoder:(NSCoder*)encoder {
    [encoder encodeInteger:self.rollbackTimeout forKey:RollbackTimeoutKey];
    [encoder encodeInteger:self.installMode forKey:InstallModeKey];
}

-(id)initWithCoder:(NSCoder*)decoder {
    self.rollbackTimeout = [decoder decodeIntegerForKey:RollbackTimeoutKey];
    self.installMode = [decoder decodeIntegerForKey:InstallModeKey];
    return self;
}

@end